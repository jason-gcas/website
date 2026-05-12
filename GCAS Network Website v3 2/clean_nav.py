import re

files = ['method.html', 'network.html', 'compliance.html', 'sba.html', 
         'stories.html', 'specialties.html', 'contract-vehicles.html', 
         'consulting.html', 'mentorship.html', 'qualify.html', 'services-fees.html']

# Read the clean index.html
with open('index.html', 'r') as f:
    index_content = f.read()

# Extract header and mobile menu from index
header_match = re.search(r'(<header class="nav".*?</header>)', index_content, re.DOTALL)
mobile_match = re.search(r'(<div class="mobile-menu".*?</div>)', index_content, re.DOTALL)

if header_match and mobile_match:
    clean_header = header_match.group(1)
    clean_mobile = mobile_match.group(1)
    
    for file in files:
        with open(file, 'r') as f:
            content = f.read()
        
        # Replace header and mobile menu
        content = re.sub(r'<header class="nav".*?</header>', clean_header, content, flags=re.DOTALL)
        content = re.sub(r'<div class="mobile-menu".*?</div>', clean_mobile, content, flags=re.DOTALL)
        
        with open(file, 'w') as f:
            f.write(content)
        print(f"Updated: {file}")

print("Done!")
