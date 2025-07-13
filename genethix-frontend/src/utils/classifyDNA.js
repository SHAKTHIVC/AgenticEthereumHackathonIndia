const dnaTagRules = [
  { keyword: "BRCA1", tags: ["Cancer", "BRCA1 Mutation", "Breast Cancer"] },
  { keyword: "BRCA2", tags: ["Cancer", "BRCA2 Mutation", "Ovarian Cancer"] },
  { keyword: "TP53", tags: ["Cancer", "Tumor Suppressor", "Li-Fraumeni Syndrome"] },
  { keyword: "EGFR", tags: ["Lung Cancer", "Oncology", "Targeted Therapy"] },
  { keyword: "KRAS", tags: ["Colon Cancer", "Pancreatic Cancer", "Oncology"] },
  { keyword: "CFTR", tags: ["Cystic Fibrosis", "Respiratory Disorders"] },
  { keyword: "HTT", tags: ["Huntington’s Disease", "Neurodegenerative"] },
  { keyword: "APOE", tags: ["Alzheimer’s Risk", "Neuro", "Aging"] },
  { keyword: "APOE-e4", tags: ["Alzheimer’s Risk", "Neurodegenerative"] },
  { keyword: "CYP2D6", tags: ["Drug Metabolism", "Pharmacogenomics"] },
  { keyword: "CYP2C9", tags: ["Warfarin Sensitivity", "Drug Response"] },
  { keyword: "CYP3A4", tags: ["Statin Sensitivity", "Drug Metabolism"] },
  { keyword: "HLA-B*57:01", tags: ["Drug Allergy", "Abacavir Reaction"] },
  { keyword: "MTHFR", tags: ["Folate Metabolism", "Methylation Issues"] },
  { keyword: "LCT", tags: ["Lactose Intolerance", "Digestion"] },
  { keyword: "SLC30A8", tags: ["Type 2 Diabetes", "Metabolism"] },
  { keyword: "MC4R", tags: ["Obesity Risk", "Metabolic"] },
  { keyword: "GBA", tags: ["Parkinson’s Risk", "Lysosomal Disorders"] },
  { keyword: "rs16969968", tags: ["Smoking Addiction", "Lung Risk"] },
  { keyword: "rs1426654", tags: ["Skin Pigmentation", "Ancestry"] },
  { keyword: "VKORC1", tags: ["Warfarin Sensitivity", "Drug Response"] },
  { keyword: "SLCO1B1", tags: ["Statin Side Effects", "Pharmacogenetics"] },
  { keyword: "ABCA1", tags: ["Cholesterol", "Heart Disease Risk"] },
  { keyword: "HLA-DRB1", tags: ["Autoimmune", "Rheumatoid Arthritis"] },
  { keyword: "BRAF", tags: ["Melanoma", "Targeted Cancer Therapy"] },
  { keyword: "FTO", tags: ["Obesity", "BMI", "Metabolism"] },
  { keyword: "Y-DNA", tags: ["Ancestry", "Paternal Lineage"] },
  { keyword: "mtDNA", tags: ["Ancestry", "Maternal Lineage"] },
  { keyword: "Haplogroup", tags: ["Ancestry", "Migration Patterns"] },
  { keyword: "ACTN3", tags: ["Muscle Strength", "Athletic Performance"] },
];

const classifyDNA = async (file) => {
  const text = await file.text();
  const matchedTags = [];
  dnaTagRules.forEach(rule => {
    if (text.includes(rule.keyword)) {
      matchedTags.push(...rule.tags);
    }
  });
  return [...new Set(matchedTags)]; // remove duplicates
};

export default classifyDNA;
