import { hexToBinary } from '../general/hex-binary';
import { sum as arraySum, multiply as arrayMultiply } from '../general/array-tools';

export class Bits {

    constructor(hex) {
        this.bin = hexToBinary(hex).split('');
        this.packets = [];
    }

    processPackets() {

        while (this.bin.length) {

            // If there are any bits left to process, parse the next package and remove trailing 0s
            let packet = this.parsePacket();
            const remainingDigits = 8 - (packet.bin.length % 8);        
            this.bin.splice(0, remainingDigits).join('');

        }       
        

    }

    parsePacket() {

        let packet = { bin: '' }

        // Identify packet version and type
        let version = this.bin.splice(0, 3).join('');
        let typeId = this.bin.splice(0, 3).join('');

        packet.bin += version + typeId;
        packet.version = parseInt(version, 2);
        packet.typeId = parseInt(typeId, 2);

        // Process sub packets if present, otherwise calculate literal value
        if (packet.typeId === 4) {
            packet = this.processLiteral(packet);
        } else {
            packet = this.processSubPackets(packet);
        }

        // Add packet to list of packets
        this.packets.push(packet);
        return packet;

    }

    processLiteral(packet) {

        let lastGroup;
        let digit = '';       

        while (!lastGroup) {

            // Whilst there are digits to parse, retrieve the next group (prefix and digit)
            let group = this.bin.splice(0, 5).join('');
            packet.bin += group;

            // Add digit (without prefix) to digit string and check if this is the final group
            digit += group.slice(1);
            lastGroup = !parseInt(group[0]);

        }

        // Parse literal value and store in packet information
        packet.value = parseInt(digit, 2);

        return packet;

    }

    processSubPackets(packet) {

        packet.subPacketBin = '';
        packet.subPackets = [];

        // Determine the length type of the sub packet
        let lengthIndicator = this.bin.splice(0, 1);
        packet.bin += lengthIndicator;

        if (parseInt(lengthIndicator)) {

            // For type 1, retrieve and parse the 11 digit length
            // Length indicates the number of sub packets present
            let totalSubPackets = this.bin.splice(0, 11).join('');
            packet.bin += totalSubPackets;

            let subPacketCount = parseInt(totalSubPackets, 2);

            while (packet.subPackets.length < subPacketCount) {

                // Parse all sub packets and store them within the parent
                let subPacket = this.parsePacket();
                packet.subPackets.push(subPacket);

                packet.bin += subPacket.bin;
                packet.subPacketBin += subPacket.bin;

            }

        } else {

            // For type 0, retrieve and parse the 15 digit length
            // Length indicates the total number of bits for the sub packets
            let totalBitsBin = this.bin.splice(0, 15).join('');
            packet.bin += totalBitsBin;

            let subPacketLength = parseInt(totalBitsBin, 2);

            while (packet.subPacketBin.length < subPacketLength) {

                // Parse all sub packets and store them within the parent
                let subPacket = this.parsePacket();
                packet.subPackets.push(subPacket);

                packet.bin += subPacket.bin;
                packet.subPacketBin += subPacket.bin;

            }

        }

        // Determine the value of the packet based on it's sub packets
        packet.value = this.calculatePacketValue(packet.typeId, packet.subPackets.map(packet => packet.value));

        return packet;

    }

    calculatePacketValue(packetType, subPacketValues) {

        // Packet value is determined based on the packet type and the known sub packet values
        // as per the stated rules
        switch (packetType) {

            case 0:
                // Packet value is the sum of sub packet values
                return arraySum(subPacketValues);

            case 1:
                // Packet value is the product of sub packet values
                return arrayMultiply(subPacketValues);

            case 2:
                // Packet value is the minimum sub packet value
                return Math.min(...subPacketValues);

            case 3:
                // Packet value is the maximum sub packet value
                return Math.max(...subPacketValues);

            case 5:
                // Packet value is 1 if the first sub packet value is greater than the second
                return subPacketValues[0] > subPacketValues[1] ? 1 : 0;

            case 6:
                // Packet value is 1 if the first sub packet value is less than the second
                return subPacketValues[0] < subPacketValues[1] ? 1 : 0;

            case 7:
                // Packet value is 1 if the first sub packet value is equal to than the second
                return subPacketValues[0] === subPacketValues[1] ? 1 : 0;

        }

    }

}