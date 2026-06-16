import re

file_path = r"c:\Users\vrush\Sponsered_project_Main\trust_management_system\frontend\src\pages\user\Home.jsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Upcoming Events
# We need to replace the event card container, image container, and text container.
# Currently the event card container is:
# className="flex flex-col sm:flex-row bg-cream rounded-[2rem] overflow-hidden group shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-stone-100 hover:border-gold hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] transition-all duration-500"
# Or originally it was "bg-cream ...". Let's use regex.

content = re.sub(
    r'className="flex flex-col sm:flex-row bg-cream rounded-\[2rem\].*?transition-all duration-500"',
    'className="flex flex-col sm:flex-row bg-white rounded-[2rem] overflow-hidden group shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-stone-200 hover:border-[#FF8C00] hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] transition-all duration-500"',
    content
)

# Remove the gradient overlay and update image container
content = content.replace(
    '<div className="sm:w-2/5 relative min-h-[250px] overflow-hidden">\n                      <div className="absolute inset-0 bg-cover bg-top group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${getImageUrl(event.featuredImage)})` }}></div>\n                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cream/90 sm:to-cream"></div>\n                    </div>',
    '<div className="sm:w-2/5 relative min-h-[250px] overflow-hidden border-b sm:border-b-0 sm:border-r border-stone-200">\n                      <div className="absolute inset-0 bg-cover bg-top group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${getImageUrl(event.featuredImage)})` }}></div>\n                    </div>'
)

# Update text container background
content = content.replace(
    '<div className="p-8 sm:w-3/5 flex flex-col justify-center relative z-10 bg-cream">',
    '<div className="p-8 sm:w-3/5 flex flex-col justify-center relative z-10 bg-white">'
)

# 2. Update Branches Cards
# Currently the branches card is:
# className="min-w-[300px] md:min-w-[350px] snap-center bg-cream rounded-[2.5rem] p-8 border border-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(141,91,47,0.2)] hover:border-gold/30 transition-all duration-300 text-center flex flex-col items-center"

content = re.sub(
    r'className="min-w-\[300px\] md:min-w-\[350px\] snap-center bg-cream rounded-\[2.5rem\] p-8 border.*?items-center"',
    'className="min-w-[300px] md:min-w-[350px] snap-center bg-white rounded-[2.5rem] p-8 border-2 border-[#FF8C00] shadow-[8px_8px_0px_rgba(255,140,0,0.2)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_rgba(255,140,0,0.4)] transition-all duration-300 text-center flex flex-col items-center"',
    content
)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Home.jsx styling for Events and Branches.")
