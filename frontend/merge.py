import re

sonali_path = r"C:\Users\vrush\Sponsered_project_Main\Sonali_changes\Home.jsx"
user_path = r"c:\Users\vrush\Sponsered_project_Main\trust_management_system\frontend\src\pages\user\Home.jsx"
output_path = r"c:\Users\vrush\Sponsered_project_Main\trust_management_system\frontend\src\pages\user\Home.jsx"

with open(sonali_path, 'r', encoding='utf-8') as f:
    sonali_content = f.read()

with open(user_path, 'r', encoding='utf-8') as f:
    user_content = f.read()

# Merge icons
# Find the import line in sonali_content
import_re = re.compile(r"import \{([^}]+)\} from 'react-icons/fa';")
sonali_icons_match = import_re.search(sonali_content)
user_icons_match = import_re.search(user_content)

if sonali_icons_match and user_icons_match:
    sonali_icons = set([i.strip() for i in sonali_icons_match.group(1).split(',')])
    user_icons = set([i.strip() for i in user_icons_match.group(1).split(',')])
    merged_icons = sonali_icons.union(user_icons)
    merged_icons_str = ", ".join(sorted(list(merged_icons)))
    sonali_content = sonali_content.replace(sonali_icons_match.group(0), f"import {{ {merged_icons_str} }} from 'react-icons/fa';")

# Find split points
split_marker_sonali = "{/* Discover More / Links Array */}"
split_marker_user = "{/* Explore Sansthan - Overlapping the Slate Section */}"

sonali_top = sonali_content[:sonali_content.find(split_marker_sonali)]
user_bottom = user_content[user_content.find(split_marker_user):]

merged_content = sonali_top + user_bottom

# Replace words globally
# The prompt says: where "Math" word use use their "Monastrey" and where Gadi -> use "Throne"
# Be careful to not replace inside import paths like "math-history". Let's replace "Math" (case sensitive, whole word or part of text but be careful about URLs).
# But wait, the URL in PAGES is "/math-history", so replacing "Math" might change "/math-history" to "/Monastrey-history" if I do a blind replace!
# Let's use regex to replace \bMath\b with Monastrey, and \bGadi\b with Throne.
# Wait, "Math" could be inside a string like `"Holy Math"`.
merged_content = re.sub(r'\bMath\b', 'Monastrey', merged_content)
merged_content = re.sub(r'\bGadi\b', 'Throne', merged_content)

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(merged_content)

print("Merged successfully.")
