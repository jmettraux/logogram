
all: dict.json dict.rb kanji.json kanji.rb radkfile.txt


kanjidic2.xml:
	wget http://www.edrdg.org/kanjidic/kanjidic2.xml.gz
	gunzip kanjidic2.xml.gz
full_kanji.json: kanjidic2.xml
	ruby lib/kanjidic_to.rb kanjidic2.xml json > full_kanji.json
full_kanji.rb: kanjidic2.xml
	ruby lib/kanjidic_to.rb kanjidic2.xml ruby > full_kanji.rb
select_kanji.json: full_kanji.json
	ruby lib/kanji_select.rb full_kanji.json json > select_kanji.json
select_kanji.rb: full_kanji.json
	ruby lib/kanji_select.rb full_kanji.json ruby > select_kanji.rb
kanji.json: select_kanji.json
	ruby lib/kanji_index.rb select_kanji.json json > kanji.json
kanji.rb: select_kanji.json
	ruby lib/kanji_index.rb select_kanji.json ruby > kanji.rb

JMdict_e.xml:
	wget http://ftp.monash.edu.au/pub/nihongo/JMdict_e.gz
	gunzip JMdict_e.gz
	mv JMdict_e JMdict_e.xml
full_dict.json: JMdict_e.xml
	ruby lib/jmdict_to.rb JMdict_e.xml json > full_dict.json
full_dict.rb: JMdict_e.xml
	ruby lib/jmdict_to.rb JMdict_e.xml ruby > full_dict.rb
select_dict.json: select_kanji.json full_dict.json
	ruby lib/dict_select.rb select_kanji.json full_dict.json json > select_dict.json
select_dict.rb: select_kanji.json full_dict.json
	ruby lib/dict_select.rb select_kanji.json full_dict.json ruby > select_dict.rb
dict.json: select_kanji.json select_dict.json
	ruby lib/dict_index.rb select_kanji.json select_dict.json json > dict.json
dict.rb: select_kanji.json select_dict.json
	ruby lib/dict_index.rb select_kanji.json select_dict.json ruby > dict.rb

radkfile.txt:
	wget http://ftp.monash.edu.au/pub/nihongo/kradzip.zip
	unzip kradzip.zip
	rm kradzip.zip
	rm radkintro* kradintro
	iconv -f EUC-JP -t UTF-8 kradfile2 > kradfile2.txt
	iconv -f EUC-JP -t UTF-8 kradfile > kradfile.txt
	iconv -f EUC-JP -t UTF-8 radkfile > radkfile.txt
	iconv -f EUC-JP -t UTF-8 radkfile2 > radkfile2.txt
	iconv -f EUC-JP -t UTF-8 radkfilex > radkfilex.txt
	rm kradfile2
	rm kradfile
	rm radkfile
	rm radkfile2
	rm radkfilex

clean:
	rm -f dict.rb
	rm -f dict.json
	rm -f kanji.rb
	rm -f kanji.json
	rm -f *_kanji.rb
	rm -f *_kanji.json
	rm -f kradfile*.txt
	rm -f radkfile*.txt

.PHONY: clean

