
# kanji_index.rb

require 'pp'
require 'json'


ks = JSON.parse(File.read(ARGV[0]))

sounds = {}

ks.each_with_index do |k, i|
  rds = k['rds'] || {}
  (rds['ja_on'] || []).each { |r| (sounds[r] ||= []) << i }
  (rds['ja_kun'] || []).each { |r| (sounds[r] ||= []) << i }
end

h = { kanji: ks, sounds: sounds }

case ARGV[1]
when 'ruby', 'rb', '.rb' then pp(h)
when 'pretty' then puts JSON.pretty_generate(h)
else puts JSON.dump(h)
end

