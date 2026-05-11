---
description: 
---

# 🚀 Project Evolver Workflow

This is the central evolution loop for the Career Hub. It processes raw daily logs into polished portfolio content and executes custom ad-hoc instructions.

## How to Trigger
Send the following prompt to the agent in your chat:
> **"Run the `.agent/workflows/project-evolver.md` workflow. [Optional: Insert any extra custom project/portfolio updates you want me to make right now]"**

---

## 🤖 Agent Execution Instructions

**As an agent executing this workflow, you must follow these steps strictly and sequentially:**

> [!IMPORTANT]
> **Maniac Teacher Mode (ENABLED)**: If you find a Mastery section or technical explanation that is just a "statement" or feels "thin," you must work like a maniac teacher to expand it. Do not accept mediocrity. Cross-reference the user's project history (MARS, Jewel-Osco, P&G, Metro, Brenntag) to manufacture a detailed, high-stakes example that illustrates the concept in action.

### Phase 1: Log Assimilation & Technical Refinement
1. **Read Logs**: Open and read `project_logs.json`.
2. **Filter Unprocessed**: Identify all log entries that do *not* have the `"incorporated": true` flag. 
   - *If all logs are already marked as incorporated, skip to Phase 1.5 — do NOT skip to Phase 2. The full-site audit must always run.*
3. **Cross-Reference**: For every unprocessed log, locate the corresponding project block in `index.html`.
4. **Evolve Pitch & Technical Deep-Dive**: Intelligently weave raw insights into the project's 'Pitch', 'Impact', and 'Q&A' sections. 
   - **Mastery Pattern (Ultra-Detailed Format)**: When writing a `<div class="meta-card mastery-breakdown">` block for Q&A, you MUST strictly format it with: 1. **Breaking Down the Original Answer & Identifying Gaps** (What works / The Gap), 2. **The Comprehensive, Gap-Filled Version** (Stakeholder Explanation / Biggest Misconception), 3. **Defining Core Math/Hypotheses**, 4. **Scenarios (A & B)** (with explicit Math and Conclusion), and 5. **Project Tie-in**. Never output a thin summary.
   - **LaTeX Standard**: All mathematical formulas, statistical notations, and logical expressions must be formatted using **LaTeX** (e.g., `$E[X]$`, `$Adj\ R^2$`) to ensure academic-grade rendering.
   - **Augmentation Principle**: Adhere to "Prioritize Augmentation over Deletion." Layer new insights on top of existing ones to build a durable knowledge repository.
   - **Constraint**: Preserve the exact HTML structure, CSS classes, and `div` boundaries.
5. **Mark Processed**: Once the HTML is updated, modify `project_logs.json` and add `"incorporated": true` to every log entry you just processed.

### Phase 1.5: Full-Site Mastery Audit
**Perform this step regardless of whether any logs were unprocessed.**

1. **Scan All Q&A Sections**: Read every `<div class="meta-card mastery-breakdown">` block across all 9 interview prep projects and the Core Analytics Q&A section in `index.html`.
2. **Identify Thin Content**: Flag any mastery breakdown that:
   - Is missing one or more of the 5 required steps (Breaking Down / Comprehensive Version / Core Math / Scenarios A & B / Project Tie-in)
   - Contains a step that is just a one-liner or summary statement with no depth
   - Lacks LaTeX for any mathematical formula or statistical notation
3. **Expand & Deepen**: Apply the Maniac Teacher Standard to every flagged block — add the missing steps, expand thin sections with project-specific logic, and retrofit LaTeX where absent. Do not delete existing content; layer on top.
4. **Scan Portfolio Roadmap**: Review all 5 Portfolio Roadmap project blocks. Check that each has a substantive description of the technical approach. If any are placeholder-thin, expand them using the project's domain context.
5. **Scan Interview Pitch & Impact Tabs**: For each of the 9 interview projects, verify the Pitch (STAR format completeness) and Impact grid (concrete metrics). Flag and expand any section that is vague or missing quantified outcomes.

### Phase 2: Custom Ad-Hoc Updates
1. **Analyze Chat Input**: Review the user's prompt that triggered this workflow.
2. **Apply Custom Edits**: Execute any explicit ad-hoc requests (e.g., UI tweaks, roadmap updates, theme changes).
   - *If no additional instructions were provided, skip this step.*

### Phase 3: Finalization & Strategic Audit
1. **Quality Check**: Verify the following in `index.html`:
   - No unclosed `<div>` tags or broken HTML structure
   - All `<div class="meta-card mastery-breakdown">` blocks contain all 5 required steps
   - No raw math expressions exist outside of LaTeX delimiters (`$...$` or `$$...$$`)
   - MathJax CDN script tag is present and untouched
   - All tab panels (`pitch`, `impact`, `qa`, `logs`) are correctly scoped within their project containers — no content bleeding across projects
2. **Ledger Update**: Append a bullet point to the Change Log in `AGENTS.md` summarizing this evolution cycle.
3. **User Summary**: End your turn by outputting a concise Markdown summary detailing:
   - Which specific projects were updated from logs.
   - Which sections were expanded during the Phase 1.5 full-site audit (list project name + what was thin).
   - Specific examples of new **Mastery Cards** or **LaTeX** integration added.
   - Which custom updates were successfully applied.
