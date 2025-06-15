# FP Capacity Backend

## Overview
This backend is built with Node.js, Express, and PostgreSQL. It provides APIs for managing production data, master data, and supports AI-driven optimization.

## Technical Details
- **Framework:** Node.js + Express
- **Database:** PostgreSQL
- **API Structure:** RESTful
- **Key Endpoints:**
  - `/api/machines` - Manage machines
  - `/api/products` - Manage products
  - `/api/raw-materials` - Manage raw materials
  - `/api/ai-references` - Manage AI reference list

## Learning Code & AI Knowledge
This section is for code and notes that help the system learn and understand technical/production concepts for future optimization and decision-making.

- **Learning Code Example:**
```js
// Example: Calculate material cost per unit
function calculateMaterialCost(weight, density, pricePerKg) {
  return weight * density * pricePerKg;
}
```
- **AI Knowledge Base:**
  - Add formulas, rules, and logic here as the system evolves.

## AI Reference List
This section is for storing references (papers, articles, standards, etc.) that the AI can use for learning and optimization.

- Example:
  - "Smith, J. (2020). Production Optimization in Flexible Plants. Journal of Manufacturing."
  - "ISO 9001:2015 Quality Management Systems"

---
Add more technical details, learning code, and references as the project grows. 