import subprocess
import re
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet

# Run pytest
result = subprocess.run(
    ["pytest", "-q", "--junitxml=report.xml"],
    capture_output=True,
    text=True
)
output = result.stdout + "\n" + result.stderr

# Extract test results
passed = len(re.findall(r"PASSED", output))
failed = len(re.findall(r"FAILED", output))
skipped = len(re.findall(r"SKIPPED", output))

# Prepare PDF
doc = SimpleDocTemplate("pytest_report.pdf")
styles = getSampleStyleSheet()
content = []

# Title
content.append(Paragraph("<b>Pytest Report</b>", styles["Title"]))
content.append(Spacer(1, 12))

# Summary Table
summary_data = [
    ["Metric", "Count"],
    ["Passed", passed],
    ["Failed", failed],
    ["Skipped", skipped],
]

summary_table = Table(summary_data)
summary_table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),

    ("BACKGROUND", (0, 1), (-1, 1), colors.lightgreen),
    ("BACKGROUND", (0, 2), (-1, 2), colors.salmon),
    ("BACKGROUND", (0, 3), (-1, 3), colors.lightyellow),

    ("GRID", (0, 0), (-1, -1), 1, colors.black),
]))

content.append(summary_table)
content.append(Spacer(1, 20))

# Detailed Results
content.append(Paragraph("<b>Test Details</b>", styles["Heading2"]))
content.append(Spacer(1, 10))

for line in output.split("\n"):
    if "PASSED" in line:
        color = "green"
    elif "FAILED" in line:
        color = "red"
    elif "SKIPPED" in line:
        color = "orange"
    else:
        color = "black"

    content.append(Paragraph(f'<font color="{color}">{line}</font>', styles["Normal"]))

# Build PDF
doc.build(content)

print("Styled PDF generated: pytest_report.pdf")