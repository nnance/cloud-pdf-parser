const STRINGS = [
    {
      stringKey: "Calcium(as Ca)",
      value: "calcium",
    }, {
      stringKey: "Chloride(as Cl)",
      value: "chloride",
    }, {
      stringKey: "Magnesium(as Mg)",
      value: "magnesium",
    }, {
      stringKey: "Sulfate(as SO 4 )",
      value: "sulfate",
    }, {
      stringKey: "Barium(as Ba)",
      value: "barium",
    }, {
      stringKey: "Dissolved CO 2 (as CO 2 )",
      value: "dissolvedCo2",
    }, {
      stringKey: "Strontium(as Sr)",
      value: "strontium",
    }, {
      stringKey: "Bicarbonate(as HCO 3 )",
      value: "bicarbonate",
    }, {
      stringKey: "Sodium(as Na)",
      value: "sodium",
    }, {
      stringKey: "Carbonate(as CO 3 )",
      value: "carbonate",
    }, {
      stringKey: "Potassium(as K)",
      value: "potassium",
    }, {
      stringKey: "Silica(as SiO 2 )",
      value: "silica",
    }, {
      stringKey: "Lithium(as Li)",
      value: "lithium",
    }, {
      stringKey: "Phosphate(as PO 4 )",
      value: "phosphate",
    }, {
      stringKey: "Iron(as Fe)",
      value: "iron",
    }, {
      stringKey: "H 2 S (as H 2 S)",
      value: "h2s",
    }, {
      stringKey: "Aluminum(as Al)",
      value: "aluminum",
    }, {
      stringKey: "Boron(as B)",
      value: "boron",
    }, {
      stringKey: "Manganese(as Mn)",
      value: "manganese",
    }, {
      stringKey: "Zinc(as Zn)",
      value: "zn",
    }, {
      stringKey: "PARAMETERS Temperature( o F)",
      value: "temp",
    }, {
      stringKey: "Sample pH",
      value: "ph",
    }, {
      stringKey: "Conductivity",
      value: "conductivity",
    }, {
      stringKey: "T.D.S.",
      value: "tds",
    }, {
      stringKey: "Resistivity",
      value: "resistivity",
    }, {
      stringKey: "Sp.Gr.(g/mL)",
      value: "spgr",
    },
  ];

const FINAL_STRING = "SCALE AND CORROSION POTENTIAL";

export const getValues = (pdfText: string) => {
    const newVals: any = {};
    STRINGS.forEach((strObj, ind) => {
        const key = strObj.stringKey;
        const startIndex = pdfText.indexOf(key) + key.length;
        const endString = (ind === STRINGS.length - 1) ? FINAL_STRING : STRINGS[ind + 1].stringKey;
        const endIndex = pdfText.indexOf(endString);

        newVals[strObj.value] = pdfText.slice(startIndex, endIndex).trim();
    });
    return newVals;
};
