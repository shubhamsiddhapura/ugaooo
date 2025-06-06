const Section = require("../Model/Section");
const Subsection = require("../Model/SubSection");

exports.createSection = async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Section.findOne({name});
    if (existing) return res.status(400).json({ message: "Section already exists" });

    const section = await Section.create({ name });
    res.status(201).json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllSections = async (req, res) => {
  try {
    const sections = await Section.find();
    res.status(200).json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await Section.findByIdAndDelete(id);
    if (!section) return res.status(404).json({ message: "Section not found" });

    res.status(200).json({ message: "Section deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSectionWithSubSections = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await Section.findById(id);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    const subSections = await Subsection.find({ sectionId: id });

    res.status(200).json({
      section,
      subSections
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
