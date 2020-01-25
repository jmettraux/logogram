
all: www/site.js www/site.css

www/site.js: src/scripts/*.js
	cd src/scripts && cat `cat _order.txt` > ../../www/site.js
www/site.css: src/sheets/*.css
	cd src/sheets && cat `cat _order.txt` > ../../www/site.css

serve:
	ruby -run -ehttpd www/ -p8000
s: serve

.PHONY: serve

