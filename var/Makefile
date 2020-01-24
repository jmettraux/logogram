
kanji.json: kanjidic2.xml
	ruby lib/kanjidic_to.rb kanjidic2.xml json > kanji.json
#kanji.pretty.json: kanjidic2.xml
#	ruby lib/kanjidic_to.rb kanjidic2.xml pretty > kanji.pretty.json
kanji.rb: kanjidic2.xml
	ruby lib/kanjidic_to.rb kanjidic2.xml ruby > kanji.rb

dict.json: JMdict_e.xml
	ruby lib/jmdict_to.rb JMdict_e.xml json > dict.json
dict.rb: JMdict_e.xml
	ruby lib/jmdict_to.rb JMdict_e.xml ruby > dict.rb

