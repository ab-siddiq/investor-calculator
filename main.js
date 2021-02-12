window.onload = function () {

    var options = {
        title: {
            text: "Allocate of your assets"
        },
        // subtitles: [{
        //     text: "As of November, 2017"
        // }],
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 40,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: 15, label: "Bank FDR" },
                { y: 1, label: "Cash" },
                { y: 20, label: "Ekush's Funds" },
                { y: 64, label: "Shanchaypatra" },
                
            ]
        }]
    };
    $("#chartContainer").CanvasJSChart(options);
    
}

let investorForm = document.getElementById("investor-form");
investorForm.addEventListener("submit", (e) => {
    e.preventDefault();
})
function investorInput() {
    let investorRiskInput = getSelectInputValue("investor-risk-tolerance-input");
    let investorCurrentAssetInput = getInputFieldValue("investor-current-asset-input");
    let investorSavingPerYearInput = getInputFieldValue("investor-saving-per-year-input");
    let investorMarginalTaxRateInput = parseFloat(getSelectInputValue("investor-marginal-tax-rate-input"));
    let investorRequiredIncomeNextTwoYearInput = getInputFieldValue("investor-required-income-next-two-year-input");
    
    // console.log(investorRequiredIncomeNextTwoYearInput, typeof (investorRequiredIncomeNextTwoYearInput));
    // console.log(parseFloat(investorMarginalTaxRateInput), typeof (parseFloat(investorMarginalTaxRateInput)));
   
    // console.log(investorMarginalTaxRateInput, typeof (investorMarginalTaxRateInput));
    
    // console.log(investorRiskInput,investorCurrentAssetInput,investorSavingPerYearInput,investorMarginalTaxRateInput,investorRequiredIncomeNextTwoYearInput);
    
    let ekushFund = calculateInvestorInput(investorRiskInput, investorCurrentAssetInput);
    investorCalculationFormula(ekushFund,investorCurrentAssetInput, investorSavingPerYearInput, investorMarginalTaxRateInput, investorRequiredIncomeNextTwoYearInput);
}

function getInputFieldValue(id) {
    let inputFieldValue = document.getElementById(id).value;
    let inputFieldValueNumber = parseFloat(inputFieldValue);
    return inputFieldValueNumber;
}

function getSelectInputValue(id) {
    let selectOptionValue = document.getElementById(id);
    let selectInputValue = selectOptionValue.options[selectOptionValue.selectedIndex].text;
    return selectInputValue;
}

function calculateInvestorInput(risk,asset) {
    if (risk == "Low" && asset <= 5000000) {
        return 0;
    } else if (risk == "Moderate" && asset <= 5000000) {
        return 10/100;
    }
     else if (risk == "High" && asset <= 5000000) {
        return 20/100;
    }
     else if (risk == "Low" && asset > 5000000) {
        return 30/100;
    }
     else if (risk == "Moderate" && asset > 5000000) {
        return 40/100;
    }
     else if (risk == "High" && asset > 5000000) {
        return 50/100;
    }
}

function investorCalculationFormula(ekusFund,asset,savings,marginalTaxRate,incomeRequired) {
    let liquidityConstraint = (savings / 12) * 6;
    let cash = liquidityConstraint / asset;
    let bankFDR = incomeRequired / 100;
    let shanchaypatra = 100 - ekusFund - bankFDR - cash;

    showInvestorOutput(ekusFund,liquidityConstraint,cash,bankFDR,shanchaypatra);
}

function showInvestorOutput(ekusFund,liquidityConstraint,cash,bankFDR,shanchaypatra) {
    document.getElementById("ekush-liquidity-constraint").innerHTML = liquidityConstraint;
    document.getElementById("ekush-fund").innerHTML = ekusFund;
    document.getElementById("ekush-shanchaypatra").innerHTML = shanchaypatra;
    document.getElementById("ekush-bank-fdr").innerHTML = bankFDR;
    document.getElementById("ekush-cash").innerHTML = cash;
}