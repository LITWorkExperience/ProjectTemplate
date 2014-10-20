module.exports = {

	CarStorage: function (storageLocation) {
        /*  if location is 'Public Road' then return a modifier of 1.8
         *  if location is 'DriveWay' then return a modifier of 0.9
         *  if location is 'Garage' then return a modifier of 0.9
         *
         *  otherwise return 1
         */
	},

	Personal: function (age, gender) {
	    //Set a default value for the modifier
        var modifier = 1.08;

        /* Applies following rules:
         *      - If male and between 17 and 21 then rate is 1.5
         *      - If male and between 21 and 25 then rate is 1.15
         *      - If male and over 25 then rate is 1.12
         *      - If female and under 25 then rate is 1.1
         *      - If female and over 25 then rate is 1.08
         */
        
        return modifier;
	},

	NoClaims: function (years) {

        /*
         * For every year of no claims take off 0.05 up to a maximum of 5 years
         */

	},

	CarCost: function(carCost) {

        /*
         * If the car costs more that 25000 then set the modifer at 2
         * if the car costs between 10000 and 25000 then set the modifier at 1.5
         * otherwise the modifier is 1.2
         */

	}
};
