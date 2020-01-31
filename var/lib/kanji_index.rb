
# kanji_index.rb

require 'pp'
require 'json'


#def katakana?(s); !! s.match(/^\p{Katakana}+$/); end


ks = JSON.parse(File.read(ARGV[0]))

by_onyomi = {}
by_kunyomi = {}

ks.each_with_index do |k, i|
  rds = k['rds'] || {}
  (rds['ja_on'] || []).each { |r| (by_onyomi[r] ||= []) << i }
  (rds['ja_kun'] || []).each { |r| (by_kunyomi[r] ||= []) << i }
end

h = {
  items: ks,
  index: {
    by_onyomi: by_onyomi, by_kunyomi: by_kunyomi } }

case ARGV[1]
when 'ruby', 'rb', '.rb' then pp(h)
when 'pretty' then puts JSON.pretty_generate(h)
else puts JSON.dump(h)
end

