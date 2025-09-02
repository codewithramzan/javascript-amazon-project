 import { Product, Clothing, Appliance } from "../../data/products.js";
 describe('test suit: Product', () => {
    let product;
    beforeEach(() => {
        product = new Product({
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            image: "images/products/intermediate-composite-basketball.jpg",
            name: "Intermediate Size Basketball",
            rating: {
            stars: 4,
            count: 127
            },
            priceCents: 2095
              });
            });
    it('has a correct properities', () => {
        expect(product.id).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
        expect(product.image).toEqual("images/products/intermediate-composite-basketball.jpg");
        expect(product.name).toBe("Intermediate Size Basketball");
        expect(product.rating).toEqual( {
            stars: 4,
            count: 127
        });
    });
        it('works getStarsUrl', () => {
            expect(product.getStarsUrl()).toEqual('images/ratings/rating-40.png');
        });
        it('get the price', () => {
            expect(product.getPrice()).toEqual('$20.95');
        });
        it('does not display any extra Info', () => {
            expect(product.extraInfoHTML()).toEqual('');
        });


        //  Test cloth class
        describe('test suit: Clothing', () => {
            let clothing;
            beforeEach(() => {
            clothing = new Clothing({
                id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
                name: "Adults Plain Cotton T-Shirt - 2 Pack",
                rating: {
                stars: 4.5,
                count: 56
                },
                priceCents: 799,
                type: "clothing",
                sizeChartLink: "images/clothing-size-chart.png"
            })
            });
            it('Has a correct properities', () => {
                expect(clothing.sizeChartLink).toEqual("images/clothing-size-chart.png");
                expect(clothing.priceCents).toEqual(799);
                expect(clothing.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
            });
            it('show extra Info HTML', () => {
                expect(clothing.extraInfoHTML()).toContain(`Size Chart`);
            });

            it('works getStarsUrl', () => {
            expect(clothing.getStarsUrl()).toEqual('images/ratings/rating-45.png');
        });
        it('get the price', () => {
            expect(clothing.getPrice()).toEqual('$7.99');
        });
    });

    // Test appliance class
    describe('test suit: Appliance', () => {
        let applaince;
        beforeEach(() => {
            applaince = new Appliance({
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
            stars: 5,
            count: 2197
            },
            priceCents: 1899,
            type: "applaince",
            instructionLink: "images/appliance-instructions.png",
            warrantyLink: "images/appliance-warranty.png"
            });
        });

        it('has a correct properties', () => {
            expect(applaince.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");
            expect(applaince.name).toBe("2 Slot Toaster - Black");
            expect(applaince.rating).toEqual({
            stars: 5,
            count: 2197
            });
        });

        it('show extra Info HTML', () => {
                expect(applaince.extraInfoHTML()).toContain(`Instruction`);
                expect(applaince.extraInfoHTML()).toContain('Warranty.')
            });

            it('works getStarsUrl', () => {
            expect(applaince.getStarsUrl()).toEqual('images/ratings/rating-50.png');
        });
        it('get the price', () => {
            expect(applaince.getPrice()).toEqual('$18.99');
        });
        it('has special properities corrects', () => {
            expect(applaince.instructionLink).toBe("images/appliance-instructions.png");
            expect(applaince.warrantyLink).toBe("images/appliance-warranty.png");
        });
    });
});