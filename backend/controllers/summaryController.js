const Expense = require("../models/Expense");

// GET /api/summary/:userId
exports.getSummary = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch all expenses for this user
    const expenses = await Expense.find({ userId });

    // Calculate totals
    const income = expenses
      .filter(e => e.type === "income")
      .reduce((sum, e) => sum + e.amount, 0);

    const spending = expenses
      .filter(e => e.type === "expense")
      .reduce((sum, e) => sum + e.amount, 0);

    const balance = income - spending;
    const savingsRate = income ? ((balance / income) * 100).toFixed(2) : 0;

    res.json({ income, spending, balance, savingsRate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching summary" });
  }
};

// PUT /api/summary/:userId
exports.updateSummary = async (req, res) => {
  try {
    const { userId } = req.params;
    const { income, spending } = req.body;

    // Optional: clear old "manual update" entries before inserting new ones
    await Expense.deleteMany({ userId, category: "Manual Update" });

    // Insert updated income if provided
    if (income !== undefined) {
      await Expense.create({
        userId,
        type: "income",
        category: "Manual Update",
        amount: income,
      });
    }

    // Insert updated spending if provided
    if (spending !== undefined) {
      await Expense.create({
        userId,
        type: "expense",
        category: "Manual Update",
        amount: spending,
      });
    }

    res.json({ message: "Summary updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating summary" });
  }
};


 