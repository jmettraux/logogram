
# kanji_index.rb

require 'pp'
require 'json'


ks = JSON.parse(File.read(ARGV[0]))

by_sound = {}

ks.each_with_index do |k, i|
  rds = k['rds'] || {}
  (rds['ja_on'] || []).each { |r| (by_sound[r] ||= []) << i }
  (rds['ja_kun'] || []).each { |r| (by_sound[r] ||= []) << i }
end

h = { items: ks, index: { by_sound: by_sound } }

case ARGV[1]
when 'ruby', 'rb', '.rb' then pp(h)
when 'pretty' then puts JSON.pretty_generate(h)
else puts JSON.dump(h)
end

