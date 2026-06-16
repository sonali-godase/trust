import os
import re

frontend_dir = r"c:\Users\vrush\Sponsered_project_Main\trust_management_system\frontend\src"

def process_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.jsx', '.js', '.json')):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                original_content = content
                
                # Replace text
                content = re.sub(r'Shree Mandir', 'Shri Gurumurti Rudrapashupati Lingayat Monastery', content, flags=re.IGNORECASE)
                content = re.sub(r'श्री मंदिर', 'Shri Gurumurti Rudrapashupati Lingayat Monastery', content) # User said replace with english string
                content = re.sub(r'Shri Shiva Temple', 'Shri Gurumurti Rudrapashupati Lingayat Monastery', content, flags=re.IGNORECASE)
                content = re.sub(r'Shiva Temple', 'Shri Gurumurti Rudrapashupati Lingayat Monastery', content, flags=re.IGNORECASE)

                # If Home.jsx, enhance shadows
                if file == 'Home.jsx':
                    # Quick actions bar: Make less whitish and boost shadow
                    content = content.replace(
                        'bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl',
                        'bg-stone-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)]'
                    )
                    content = content.replace(
                        'bg-white/10 rounded-full border border-white/20',
                        'bg-black/20 rounded-full border border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.5)]'
                    )

                    # Explore the Sansthan cards
                    content = content.replace(
                        'shadow-xl border border-white bg-white flex flex-col',
                        'shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] border-0 bg-white flex flex-col'
                    )

                    # Analytics block
                    content = content.replace(
                        'shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-stone-100',
                        'shadow-[0_30px_80px_rgba(0,0,0,0.15)] border-0'
                    )

                    # Events cards
                    content = content.replace(
                        'shadow-md border border-white hover:border-gold hover:shadow-xl',
                        'shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-stone-100 hover:border-gold hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)]'
                    )
                    
                    # Branches cards
                    content = content.replace(
                        'shadow-lg border border-white/60 hover:border-gold/30 hover:shadow-2xl',
                        'shadow-[0_20px_50px_rgba(0,0,0,0.12)] border-0 hover:border-gold/30 hover:shadow-[0_30px_70px_rgba(0,0,0,0.2)]'
                    )

                if content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated {file_path}")

process_files(frontend_dir)
print("All updates completed.")
