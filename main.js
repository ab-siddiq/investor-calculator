window.onload =  function (getValues)  {
    console.log(getValues.cash);
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
                { y: getValues.bankFDR  || 10, label: "Bank FDR" },
                { y: getValues.cash || 0, label: "Cash" },
                { y: getValues.ekushFund || 0, label: "Ekush's Funds" },
                { y: getValues.shanchaypatra || 0, label: "Shanchaypatra" },
                
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
        return 10;
    }
     else if (risk == "High" && asset <= 5000000) {
        return 20;
    }
     else if (risk == "Low" && asset > 5000000) {
        return 30;
    }
     else if (risk == "Moderate" && asset > 5000000) {
        return 40;
    }
     else if (risk == "High" && asset > 5000000) {
        return 50;
    }
}

function investorCalculationFormula(ekusFund,asset,savings,marginalTaxRate,incomeRequired) {
    let liquidityConstraint = (savings / 12) * 6;
    let cash = (liquidityConstraint / asset);
    let ekusFunds = ekusFund;
    let bankFDR = incomeRequired ;
    let Calculateshanchaypatra = (100 - ekusFund - bankFDR - cash)/100;
    let shanchaypatra = Calculateshanchaypatra.toFixed(2);
    const outputValues = {
        liquidity: liquidityConstraint,
        cash: cash,
        bankFDR: bankFDR,
        shanchaypatra: shanchaypatra,
        ekushFund: ekusFunds,
    }
    window.onload(outputValues);
    showInvestorOutput(ekusFund,liquidityConstraint,cash,bankFDR,shanchaypatra);
}

function showInvestorOutput(ekusFund,liquidityConstraint,cash,bankFDR,shanchaypatra) {
    document.getElementById("ekush-liquidity-constraint").innerHTML = liquidityConstraint;
    document.getElementById("ekush-fund").innerHTML = ekusFund/100;
    document.getElementById("ekush-shanchaypatra").innerHTML = shanchaypatra;
    document.getElementById("ekush-bank-fdr").innerHTML = bankFDR/100;
    document.getElementById("ekush-cash").innerHTML = cash;
}