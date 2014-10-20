module.exports = {

	CarStorage: function (storageLocation) {
    	var modifier = 1;
        if (storageLocation === "Public Road")
        {
            modifier = 1.8;
        }
        else if (storageLocation === "Driveway")
        {
            modifier = 0.9;
        }
        else if (storageLocation === "Garage")
        {
            modifier = 0.9;
        }
        return modifier;
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
        if (gender === "M" || gender === "m")
        {
            if (age > 17 && age <= 21)
            {
                modifier = 1.5;
            }
            else if (age > 21 && age < 25)
            {
                modifier = 1.15;
            }
            else
            {
                modifier = 1.12;
            }
        }
        else if (gender === "F" || gender === "f")
        {
            if (age < 25)
                modifier = 1.1;
        }

        return modifier;
	},

	NoClaims: function (years) {
		var MaxYears = 5;
		var modifier = 1;

        /*
         * For every year of no claims take off 0.05 up to a maximum of 5 years
         */
        for (var index = 0; index < years && index <= MaxYears; index++) 
            modifier = modifier - 0.05;

        return modifier;
	},

	CarCost: function(carCost) {
		var modifier = 1;

        if (carCost > 25000)
        {
            modifier = 2;
        }
        else if (carCost > 10000 && carCost < 25000)
        {
            modifier = 1.5;
        }

        return modifier;
	}
};