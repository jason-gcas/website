#!/bin/bash
for file in index.html method.html network.html compliance.html sba.html stories.html specialties.html contract-vehicles.html consulting.html mentorship.html qualify.html services-fees.html; do
  if [ -f "$file" ]; then
    echo "Fixing $file..."
    sed -i '' '/<a href="consultants.html">Consultants<\/a>/d' "$file"
    sed -i '' '/<a href="consultants.html">Become a Consultant<\/a>/d' "$file"
    sed -i '' 's|<a href="stories.html">Stories</a>|<a href="stories.html">Stories</a>\n        <a href="services-fees.html">Services & fees</a>|' "$file"
    sed -i '' 's|<a href="services-fees.html">Services & fees</a>|<a href="services-fees.html">Services & fees</a>\n        <a href="contact.html">Contact</a>|' "$file"
    sed -i '' 's|<a href="stories.html">Client Stories</a>|<a href="stories.html">Client Stories</a>\n    <a href="services-fees.html">Services & fees</a>|' "$file"
    sed -i '' 's|<a href="services-fees.html">Services & fees</a>|<a href="services-fees.html">Services & fees</a>\n    <a href="contact.html">Contact</a>|' "$file"
  fi
done
echo "Done!"
