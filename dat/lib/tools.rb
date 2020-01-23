
require 'rexml/document'
require 'rexml/streamlistener'

class KanjiListener
  include REXML::StreamListener
  def tag_start(*args)
    puts "tag_start: #{args.collect(&:inspect).join(', ')}"
  end
  def text(t)
    puts "    #{t.inspect}"
  end
  def tag_end(*args)
    puts "  / #{args.first}"
  end
end

REXML::Document
  .parse_stream(
    File.new('kanjidic2.xml'),
    KanjiListener.new)

