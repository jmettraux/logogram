
serve:
	ruby -run -ehttpd www/ -p8000
s: serve

.PHONY: serve

