
all: public/site.js public/site.css

public/site.js: scripts/*.js
	cd scripts && cat `cat _order.txt` > ../public/site.js
public/site.css: sheets/*.css
	cd sheets && cat `cat _order.txt` > ../public/site.css

touch:
	touch scripts/*.js
	touch sheets/*.css
force: touch all
f: force

serve:
	ruby -run -ehttpd public/ -p8000
s: serve

.PHONY: serve

