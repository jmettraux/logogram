
all: www/site.js www/site.css

www/site.js: src/scripts/*.js
	cd src/scripts && cat `cat _order.txt` > ../../www/site.js
	#cd src/scripts && cat `cat _order.txt | sed 's/ +$//'`
	#cat src/scripts/*.js > www/site.js
www/site.css: src/sheets/*.css
	cat src/sheets/*.css > www/site.css

serve:
	ruby -run -ehttpd www/ -p8000
s: serve

.PHONY: serve

