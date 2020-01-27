
all: public/site.js public/site.css public/data.js

public/site.js: scripts/*.js
	cd scripts && cat `cat _order.txt` > ../public/site.js

public/site.css: sheets/*.css
	cd sheets && cat `cat _order.txt` > ../public/site.css

public/data.js: var/kanji.json
	echo 'window.lgdata = {};' > public/data.js
	echo 'window.lgdata.kanji = ' >> public/data.js
	cat var/kanji.json >> public/data.js
	echo ';' >> public/data.js

touch:
	touch scripts/*.js
	touch sheets/*.css
	touch var/*.json
force: touch all
f: force

serve:
	ruby -run -ehttpd public/ -p8000
s: serve

.PHONY: serve

