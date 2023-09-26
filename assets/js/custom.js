// Function to calculate BMI
function calculateBMI() {
   // Check which tab is currently active
   var usUnitsActive = document.getElementById('usUnitTab').classList.contains('active');
   var heightMeters, weightKilograms;

   if (usUnitsActive) {
      // Calculate BMI for US Units (feet, inches, pounds)
      var heightFeet = parseFloat(document.getElementById('heightFeet').value);
      var heightInches = parseFloat(document.getElementById('heightInches').value);
      var weightPounds = parseFloat(document.getElementById('weightPounds').value);

      // Convert height to meters and weight to kilograms
      heightMeters = (heightFeet * 0.3048) + (heightInches * 0.0254);
      weightKilograms = weightPounds * 0.453592;
   } else {
      // Calculate BMI for Metric Units (CM, KG)
      heightMeters = parseFloat(document.getElementById('height').value) / 100;
      weightKilograms = parseFloat(document.getElementById('weight').value);
   }
   var age = parseFloat(document.getElementById('age').value);
   var gender = document.getElementById('gender').value;
   var bmi = 0;

   // Calculate BMI based on gender and units
   if (gender === 'male') {
      bmi = (weightKilograms / Math.pow(heightMeters, 2)).toFixed(2);
   } else if (gender === 'female') {
      bmi = ((weightKilograms) / Math.pow(heightMeters, 2)).toFixed(2);
   }

   // Determine BMI category
   var category = "";
   if (bmi < 16) {
      category = "Severe Thinness";
   } else if (bmi >= 16 && bmi < 17) {
      category = "Moderate Thinness";
   } else if (bmi >= 17 && bmi < 18.5) {
      category = "Mild Thinness";
   } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal";
   } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
   } else if (bmi >= 30 && bmi < 35) {
      category = "Obese Class I";
   } else if (bmi >= 35 && bmi < 40) {
      category = "Obese Class II";
   } else {
      category = "Obese Class III";
   }
   // Display the result in the table
   document.getElementById('ageOutput').textContent = age;
   document.getElementById('genderOutput').textContent = gender;
   if (usUnitsActive) {
      document.getElementById('heightOutput').textContent = heightFeet + " feet " + heightInches + " inches";
      document.getElementById('weightOutput').textContent = weightPounds + " pounds";
   } else {
      document.getElementById('heightOutput').textContent = (heightMeters * 100).toFixed(2) + " cm";
      document.getElementById('weightOutput').textContent = weightKilograms + " kg";
   }
   document.getElementById('bmiOutput').textContent = bmi + " kg/㎡ (" + category + ")";
}
// Event listener for the US Unit tab
document.getElementById('usUnitTab').addEventListener('click', function (e) {
   e.preventDefault();
   document.getElementById('usUnitTab').classList.add('active');
   document.getElementById('metricUnitTab').classList.remove('active');
   document.getElementById('usUnits').style.display = 'block';
   document.getElementById('metricUnits').style.display = 'none';
});
 
// Event listener for the Metric Unit tab
document.getElementById('metricUnitTab').addEventListener('click', function (e) {
   e.preventDefault();
   document.getElementById('metricUnitTab').classList.add('active');
   document.getElementById('usUnitTab').classList.remove('active');
   document.getElementById('usUnits').style.display = 'none';
   document.getElementById('metricUnits').style.display = 'block';
});
 
// Event listener for form submission
document.getElementById('bmiForm').addEventListener('submit', function (e) {
   e.preventDefault();
   calculateBMI();
});
 
// Event listener for clear button
document.getElementById('clear').addEventListener('click', function(event) {
   event.preventDefault();
   // Clear form fields
   document.getElementById('gender').selectedIndex = 0;
   document.getElementById('age').value = '';
   document.getElementById('ageValidation').textContent = '';

   if (document.getElementById('usUnitTab').classList.contains('active')) {
      document.getElementById('heightFeet').value = '0';
      document.getElementById('heightInches').value = '0';
      document.getElementById('weightPounds').value = '0';
   } else {
      document.getElementById('height').value = '0';
      document.getElementById('weight').value = '0';
   }
});

// Event listener for age input validation
document.getElementById('age').addEventListener('input', function() {
   var age = this.value;
   var ageValidationElement = document.getElementById('ageValidation');
   if (age < 1 || age > 120) {
      ageValidationElement.textContent = 'Age must be between 1 and 120 years.';
   } else {
      ageValidationElement.textContent = '';
   }
});