import { sum as arraySum } from './array-tools';

export class Cuboid {

    constructor(dimensions) {

        // Store individual dimensions from input
        this.l = parseInt(dimensions[0]);
		this.w = parseInt(dimensions[1]);
		this.h = parseInt(dimensions[2]);

        // Calculate cuboid properties on initialisation
        this.calculateProperties();

    }

    calculateProperties() {

        // Calculate area of each side type
        this.sides = [ 
            this.l * this.w, 
            this.w * this.h, 
            this.l * this.h
        ];

        // Surface area is sum of each side type (multiplied by 2)
        this.surfaceArea = 2 * arraySum(this.sides);

        // Calculate perimeter of each side type
        this.perimeter = [ 
            2 * (this.l + this.w),
            2 * (this.w + this.h),
            2 * (this.l + this.h),
        ];

        // Calculate volume of cuboid
        this.volume = this.l * this.w * this.h;

    }

    getSides() {
        return this.sides;
    }

    getSurfaceArea() {
        return this.surfaceArea;
    }

    getPerimeter() {
        return this.perimeter;
    }

    getVolume() {
        return this.volume;
    }

    setLength(value) {

        // Update cuboid dimensions as specified and recalculate properties
        this.l = value;
        this.calculateProperties();

    }

    setWidth(value) {

        // Update cuboid dimensions as specified and recalculate properties
        this.w = value;
        this.calculateProperties();

    }

    setHeight(value) {

        // Update cuboid dimensions as specified and recalculate properties
        this.h = value;
        this.calculateProperties();

    }

    setDimensions(l = this.l, h = this.h, w = this.w) {

        // Check if update to dimensions is required
        if (
            l === this.l &&
            h === this.h &&
            w === this.w
        ) {
            return;
        }

        // Update cuboid dimensions as specified and recalculate properties
        this.l = l;
        this.h = h;
        this.w = w;

        this.calculateProperties();

    }

}