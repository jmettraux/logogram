
require 'pp'
require 'set'
require 'json'


index = {}

count = 0
known = Set.new
unknown = Set.new

JSON.parse(File.read('var/kanji.json')).each do |k|

  lit = k['lit']
  grd = k['grd']
  jlpt = k['jlpt']
  frq = k['frq']

  count += 1
  known << k if grd || jlpt || frq
  unknown << k unless grd || jlpt || frq

  (index["g#{grd}"] ||= []) << lit if grd
  (index["j#{jlpt}"] ||= []) << lit if jlpt
end

puts "#{known.size}/#{count}"

by_scount = known
  .inject({}) { |h, k| (h[k['sc']] ||= []) << k; h }
  .each { |sc, ks| ks.sort_by! { |k| k['grd'] || 99 } }

by_scount.keys.sort.each do |sc|
  puts "#{sc}:"
  by_scount[sc].each { |k| print k['lit'] }
  puts
end

