
# kanji_index.rb

require 'pp'
require 'json'


#def katakana?(s); !! s.match(/^\p{Katakana}+$/); end

rs = ' ' + (0x2F00..0x2F00 + 213).collect { |i| i.chr(Encoding::UTF_8) }.join

ks = JSON.parse(File.read(ARGV[0]))

by_onyomi = {}
by_kunyomi = {}

ks.each_with_index do |k, i|

  rds = k['rds'] || {}

  (rds['ja_on'] || []).each { |r|
    (by_onyomi[r] ||= []) << i }

  (rds['ja_kun'] || []).each { |r|
    (by_kunyomi[r] ||= []) << i
    (by_kunyomi[r.split('.').first] ||= []) << i if r.index('.') }

  classical = k.dig('rvs', 'classical')
  k['clrd'] = rs[classical] if classical
end

by_onyomi = by_onyomi
  .select { |k, _| k[0, 1] != '-' }
  .sort_by { |k, _| k }
by_kunyomi = by_kunyomi
  .select { |k, _| k[0, 1] != '-' }
  .sort_by { |k, _| k }

h = {
  items: ks,
  index: {
    by_onyomi: by_onyomi, by_kunyomi: by_kunyomi } }

case ARGV[1]
when 'ruby', 'rb', '.rb' then pp(h)
when 'pretty' then puts JSON.pretty_generate(h)
else puts JSON.dump(h)
end

