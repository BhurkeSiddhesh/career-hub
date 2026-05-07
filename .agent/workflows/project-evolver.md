# 🚀 Project Evolver Workflow

This is the central evolution loop for the Career Hub. It processes raw daily logs into polished portfolio content and executes custom ad-hoc instructions.

## How to Trigger
Send the following prompt to the agent in your chat:
> **"Run the `.agent/workflows/project-evolver.md` workflow. [Optional: Insert any extra custom project/portfolio updates you want me to make right now]"**

---

## 🤖 Agent Execution Instructions

**As an agent executing this workflow, you must follow these steps strictly and sequentially:**

### Phase 1: Log Assimilation
1. **Read Logs**: Open and read `project_logs.json`.
2. **Filter Unprocessed**: Identify all log entries that do *not* have the `"incorporated": true` flag. 
   - *If all logs are already marked as incorporated, skip to Phase 2.*
3. **Cross-Reference**: For every unprocessed log, locate the corresponding project block in `index.html`.
4. **Evolve Pitch**: Intelligently weave the raw insights, questions, and details from the logs into the project's 'Pitch', 'Impact', and 'Q&A' sections. 
   - *Constraint*: You must preserve the exact HTML structure, CSS classes, and `div` boundaries.
5. **Mark Processed**: Once the HTML is updated, modify `project_logs.json` and add `"incorporated": true` to every log entry you just processed so they are skipped next time.

### Phase 2: Custom Ad-Hoc Updates
1. **Analyze Chat Input**: Review the user's prompt that triggered this workflow.
2. **Apply Custom Edits**: If the user appended any custom instructions (e.g., "Add a new skill to my roadmap", "Change the theme color", "Rewrite the meta advice section"), execute those changes across the repo now.
   - *If the user provided no additional string/instructions, skip this step.*

### Phase 3: Finalization & Audit
1. **Quality Check**: Verify `index.html` syntax is intact and no tags are broken.
2. **Ledger Update**: Append a brief bullet point to the Change Log in `AGENTS.md` summarizing this evolution cycle.
3. **User Summary**: End your turn by outputting a concise Markdown summary to the user detailing:
   - Which specific projects were updated from logs.
   - Which custom updates were successfully applied.
