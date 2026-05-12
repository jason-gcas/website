import re

files = ['method.html', 'network.html', 'compliance.html', 'sba.html', 
         'stories.html', 'specialties.html', 'contract-vehicles.html', 
         'consulting.html', 'mentorship.html', 'qualify.html', 'services-fees.html']

# Read the clean header navigation from index.html
with open('index.html', 'r') as f:
    index_content = f.read()

# Extract just the desktop navigation (nav-links section)
nav_match = re.search(r'(<nav class="nav-links".*?</nav>)', index_content, re.DOTALL)
# Extract just the mobile menu
mobile_match = re.search(r'(<div class="mobile-menu".*?</div>)', index_content, re.DOTALL)

if nav_match and mobile_match:
    clean_nav = nav_match.group(1)
    clean_mobile = mobile_match.group(1)
    
    for file in files:
        with open(file, 'r') as f:
            content = f.read()
        
        # Replace only the nav-links section, not the whole header
        content = re.sub(r'<nav class="nav-links".*?</nav>', clean_nav, content, flags=re.DOTALL)
        # Replace only the mobile menu section
        content = re.sub(r'<div class="mobile-menu".*?</div>', clean_mobile, content, flags=re.DOTALL)
        
        with open(file, 'w') as f:
            f.write(content)
        print(f"Fixed: {file}")
else:
    print("Could not find navigation sections in index.html")
    
print("Done!")
