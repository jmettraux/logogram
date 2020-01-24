
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
  known << lit if grd || jlpt || frq
  unknown << lit unless grd || jlpt || frq

  (index["g#{grd}"] ||= []) << lit if grd
  (index["j#{jlpt}"] ||= []) << lit if jlpt
end

#index = index.inject({}) { |h, (k, v)| h[k] = v.join; h }
#
#pp index
puts "#{known.size}/#{count}"
#p unknown.size
#
#puts
#known.each { |lit| print lit }
##unknown.each { |lit| print lit }

