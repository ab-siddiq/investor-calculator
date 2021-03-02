window.onload =  function (liquidityConstraint,ekusFund,shanchaypatra,bankFDR,cash)  {
    
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
                { y: bankFDR  || 10, label: "Bank FDR" },
                { y: cash || 0, label: "Cash" },
                { y: ekusFund || 0, label: "Ekush's Funds" },
                { y: shanchaypatra || 0, label: "Shanchaypatra" },
                
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
    investorCalculationFormula(investorRiskInput, investorCurrentAssetInput, investorSavingPerYearInput, investorMarginalTaxRateInput, investorRequiredIncomeNextTwoYearInput);
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

// function calculateInvestorInput(risk,asset) {
  
// }

function investorCalculationFormula(risk,asset,savings,marginalTaxRate,incomeRequired) {
    let liquidityConstraint = (savings / 12) * 6;
    
    const percent = {
        p1: 0,
        p2: 10,
        p3: 20,
        p4: 30,
        p5: 40,
        p6: 50
    }

   
    //1 low <50
   
        let ekusFund1 = percent.p1;
        let cash1 = liquidityConstraint / asset;
        let bankFDR1 = incomeRequired;
        let shanchaypatra1 = 100 - bankFDR1 -cash1;
        console.log('lowless',ekusFund1,shanchaypatra1,bankFDR1,cash1)

        
        //2 moderate <50
        let ekusFund2 = percent.p2;
        let cash2 = liquidityConstraint / asset;
        let bankFDR2 = bankFDR1;
        let shanchaypatra2 = 100 - ekusFund2- bankFDR1 -cash2;
        console.log('moderateless',ekusFund2,shanchaypatra2,bankFDR2,cash2)
    
        //3 high <50
        let ekusFund3 = percent.p3;
        let cash3 = liquidityConstraint / asset;
        let bankFDR3 = incomeRequired;
        let shanchaypatra3 = 100 - cash2 - bankFDR3 -ekusFund3;
        console.log('highless',ekusFund3,shanchaypatra3,bankFDR3,cash3)
        
   
        //4 low >50
        let ekusFund4 = percent.p4;
        let cash4 = 0/ekusFund3;
        let bankFDR4 = cash3;
        let shanchaypatra4 = 100 - ekusFund4 - cash3 -cash4;
        console.log('lowgreater',ekusFund4,shanchaypatra4,bankFDR4,cash4)
        
        //5 moderate >50
        let ekusFund5 = percent.p5;
        let cash5 = 0 / ekusFund3;
        let bankFDR5 = bankFDR4;
        let shanchaypatra5 = 100 - ekusFund5 - bankFDR4 -cash5;
        console.log('moderategreater',ekusFund5,shanchaypatra5,bankFDR5,cash5)
        
        //6 high >50
        let ekusFund6 = percent.p6;
        let cash6 = 0 / ekusFund3;
        let bankFDR6 = cash3;
        let shanchaypatra6 = 100 - cash6 - bankFDR6 -ekusFund6;
        console.log('highgreater',ekusFund6,shanchaypatra6,bankFDR6,cash6)
        
        if (risk == "Low" && asset <= 5000000) {
            showInvestorOutput(liquidityConstraint,ekusFund1,shanchaypatra1,bankFDR1,cash1);
            window.onload(liquidityConstraint,ekusFund1,shanchaypatra1,bankFDR1,cash1);
        } else if (risk == "Moderate" && asset <= 5000000) {
            showInvestorOutput(liquidityConstraint,ekusFund2,shanchaypatra2,bankFDR2,cash2);
            window.onload(liquidityConstraint,ekusFund2,shanchaypatra2,bankFDR2,cash2);
        }
         else if (risk == "High" && asset <= 5000000) {
            showInvestorOutput(liquidityConstraint,ekusFund3,shanchaypatra3,bankFDR3,cash3);
            window.onload(liquidityConstraint,ekusFund3,shanchaypatra3,bankFDR3,cash3);
        }
         else if (risk == "Low" && asset > 5000000) {
            showInvestorOutput(liquidityConstraint,ekusFund4,shanchaypatra4,bankFDR4,cash4);
            window.onload(liquidityConstraint,ekusFund4,shanchaypatra4,bankFDR4,cash4);
        }
         else if (risk == "Moderate" && asset > 5000000) {
            showInvestorOutput(liquidityConstraint,ekusFund5,shanchaypatra5,bankFDR5,cash5);
            window.onload(liquidityConstraint,ekusFund5,shanchaypatra5,bankFDR5,cash5);
        }
         else if (risk == "High" && asset > 5000000) {
            showInvestorOutput(liquidityConstraint,ekusFund6,shanchaypatra6,bankFDR6,cash6);
            window.onload(liquidityConstraint,ekusFund6,shanchaypatra6,bankFDR6,cash6);
        }

}

function showInvestorOutput(liquidityConstraint,ekusFund,shanchaypatra,bankFDR,cash) {
    document.getElementById("ekush-liquidity-constraint").innerHTML = liquidityConstraint;
    document.getElementById("ekush-fund").innerHTML = ekusFund +"%";
    document.getElementById("ekush-shanchaypatra").innerHTML = shanchaypatra/100;
    document.getElementById("ekush-bank-fdr").innerHTML = bankFDR/100;
    document.getElementById("ekush-cash").innerHTML = cash;
}





