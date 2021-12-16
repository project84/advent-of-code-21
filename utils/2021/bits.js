import { hexToBinary } from '../general/hex-binary';
import { sum as arraySum, multiply as arrayMultiply } from '../general/array-tools';

export class Bits {

    constructor(hex) {
        this.bin = hexToBinary(hex).split('');
    }

    parsePackets() {

        let packet = { bin: '' };

        // Identify packet version and type
        let version = this.bin.splice(0, 3).join('');
        let typeId = this.bin.splice(0, 3).join('');

        packet.version = parseInt(version, 2);
        packet.typeId = parseInt(typeId, 2);

        // Process sub packets if present, otherwise calculate literal value
        if (packet.typeId === 4) {
            packet = this.processLiteral(packet);
        } else {
            packet = this.processSubPackets(packet);
        }

        return packet;

    }

    processLiteral(packet) {

        let lastGroup;
        let digit = '';       

        while (!lastGroup) {

            // Whilst there are digits to parse, retrieve the next group (prefix and digit)
            let group = this.bin.splice(0, 5).join('');

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

        // Determine the length type of the sub packet and retrieve the sub packet length information
        let lengthType = parseInt(this.bin.splice(0, 1));
        let subPacketsLength = this.bin.splice(0, lengthType ? 11 : 15).join('');

        // Determine the target count based on the subpacket length, store current length of bits for later use
        let targetCount = parseInt(subPacketsLength, 2);
        let preprocessLength = this.bin.length;
        let targetMet;

        while (!targetMet) {

            // Parse all sub packets and store them within the parent
            let subPacket = this.parsePackets();
            packet.subPackets.push(subPacket);

            // Determine whether target count has been met
            targetMet = lengthType ?
                packet.subPackets.length === targetCount :
                (preprocessLength - this.bin.length) === targetCount;

        }

        // Determine the value of the packet based on it's sub packets
        packet.value = this.calculatePacketValue(packet.typeId, packet.subPackets.map(packet => packet.value));
        packet.versionSum = arraySum(packet.subPackets.map(s => s.version + (s.versionSum || 0)));

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