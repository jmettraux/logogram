
require 'pp'
require 'json'
require 'rexml/document'
require 'rexml/streamlistener'


class KanjiListener

  include REXML::StreamListener

  attr_reader :characters

  def initialize
    super
    @tag_stack = []
    @characters = []
  end

  def tag_start(*args)
    @tag_stack << args
    m = "on_#{args.first}_start"
#p [ :start, args, m ]
    send(m, *args) if respond_to?(m, true)
#p args unless respond_to?(m)
  end
  def text(t)
    return if @tag_stack.empty?
    m = "on_#{@tag_stack.last.first}_text"
    send(m, t) if respond_to?(m, true)
  end
  def tag_end(*args)
    @tag_stack.pop
    m = "on_#{args.first}_end"
#p [ :end, args, m ]
    send(m, *args) if respond_to?(m, true)
  end

  protected

  def char; @characters.last; end
  def tag_name; @tag_stack.last[0]; end
  def tag; @tag_stack.last[1]; end

  def narrow(t); t.match(/^\d+$/) ? t.to_i : t; end

  def on_character_start(*args)
    @characters << {}
  end
#  def on_character_end(*args)
#puts ">" * 80
#pp @characters
#exit 0
#  end
  def on_literal_text(t)
    char[:lit] = t
  end
  def on_cp_value_text(t)
    (char[:cps] ||= {})[tag['cp_type']] = t
  end
  def on_rad_value_text(t)
    (char[:rvs] ||= {})[tag['rad_type']] = t.to_i
  end
  def on_stroke_count_text(t)
    char[:sc] = t.to_i
  end
  def on_grade_text(t)
    char[:grd] = t.to_i
  end
  def on_freq_text(t)
    char[:frq] = t.to_i
  end
  def on_jlpt_text(t)
    char[:jlpt] = t.to_i
  end
  def on_dic_ref_text(t)
    type = tag['dr_type']
    (char[:drs] ||= {})[type] = narrow(t)
    a = tag['m_vol']; char[:drs]['moro_vol'] = narrow(a) if a
    a = tag['m_page']; char[:drs]['moro_page'] = narrow(a) if a
  end
  def on_q_code_text(t)
    type = tag['qc_type']
    skimis = tag['skip_misclass']
    type = [ type, '_skip_misclass', skimis ].join('_') if skimis
    (char[:qcs] ||= {})[type] = t
  end
  def on_reading_text(t)
    ((char[:rds] ||= {})[tag['r_type']] ||= []) << t
  end
  def on_meaning_text(t)
    return unless [ nil, 'en' ].include?(tag['m_lang'])
    ((char[:mns] ||= {})[tag['m_lang'] || 'en'] ||= []) << t
  end
  def on_nanori_text(t)
    (char[:nnrs] ||= []) << t
  end
  def on_variant_text(t)
    ((char[:vrs] ||= {})[tag['var_type']] ||= []) << t
  end
  def on_rad_name_text(t)
    (char[:rdns] ||= []) << t
  end
end


l = KanjiListener.new

REXML::Document.parse_stream(File.new(ARGV[0]), l)

case ARGV[1]
when 'ruby', 'rb', '.rb' then pp(l.characters)
when 'pretty' then puts JSON.pretty_generate(l.characters)
else puts JSON.dump(l.characters)
end

