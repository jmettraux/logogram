
require 'pp'
require 'json'
require 'rexml/document'
require 'rexml/streamlistener'


class DictListener

  include REXML::StreamListener

  #attr_reader :characters

  def initialize
    super
    @tag_stack = []
    @entries = []
  end

  def tag_start(*args)
    @tag_stack << args
    m = "on_#{args.first}_start"
    send(m, *args) if respond_to?(m, true)
  end
  def text(t)
    return if @tag_stack.empty?
    m = "on_#{@tag_stack.last.first}_text"
    send(m, t) if respond_to?(m, true)
  end
  def tag_end(*args)
    @tag_stack.pop
    m = "on_#{args.first}_end"
    send(m, *args) if respond_to?(m, true)
  end

  protected

  def tag_name; @tag_stack.last[0]; end
  def tag; @tag_stack.last[1]; end

  def entry; @entries.last; end

  #def narrow(t); t.match(/^\d+$/) ? t.to_i : t; end
  def de_entitize(t); m = t.match(/^&([^;]+);$/); m ? m[1] : t; end

  def on_entry_end(*args)
    return if entry[:seq] < 1001000
puts ">" * 80
pp @entries
exit 0
  end
  def on_entry_start(*args)
    @entries << {}
  end
  def on_ent_seq_text(t)
    entry[:seq] = t.to_i
  end
  def on_keb_text(t)
    (entry[:ks] ||= []) << [ t ]
  end
  def on_ke_inf_text(t)
    entry[:ks].last << de_entitize(t)
  end
  def on_ke_pri_text(t)
    (entry[:ks].last) << t
  end
##
  def on_reb_text(t)
    (entry[:rs] ||= []) << [ t ]
  end
  def on_re_nokanji_start
    entry[:rs].last << 'nokanji'
  end
#  def on_literal_text(t)
#    char[:lit] = t
#  end
#  def on_cp_value_text(t)
#    (char[:cps] ||= {})[tag['cp_type']] = t
#  end
#  def on_rad_value_text(t)
#    (char[:rvs] ||= {})[tag['rad_type']] = t.to_i
#  end
#  def on_stroke_count_text(t)
#    char[:sc] = t.to_i
#  end
#  def on_grade_text(t)
#    char[:grd] = t.to_i
#  end
#  def on_freq_text(t)
#    char[:frq] = t.to_i
#  end
#  def on_jlpt_text(t)
#    char[:jlpt] = t.to_i
#  end
#  def on_dic_ref_text(t)
#    type = tag['dr_type']
#    (char[:drs] ||= {})[type] = narrow(t)
#    a = tag['m_vol']; char[:drs]['moro_vol'] = narrow(a) if a
#    a = tag['m_page']; char[:drs]['moro_page'] = narrow(a) if a
#  end
#  def on_q_code_text(t)
#    type = tag['qc_type']
#    skimis = tag['skip_misclass']
#    type = [ type, '_skip_misclass', skimis ].join('_') if skimis
#    (char[:qcs] ||= {})[type] = t
#  end
#  def on_reading_text(t)
#    ((char[:rds] ||= {})[tag['r_type']] ||= []) << t
#  end
#  def on_meaning_text(t)
#    return unless [ nil, 'en' ].include?(tag['m_lang'])
#    ((char[:mns] ||= {})[tag['m_lang'] || 'en'] ||= []) << t
#  end
#  def on_nanori_text(t)
#    (char[:nnrs] ||= []) << t
#  end
#  def on_variant_text(t)
#    ((char[:vrs] ||= {})[tag['var_type']] ||= []) << t
#  end
#  def on_rad_name_text(t)
#    (char[:rdns] ||= []) << t
#  end
end


kl = DictListener.new

REXML::Document.parse_stream(File.new(ARGV[0]), kl)

case ARGV[1]
when 'ruby', 'rb', '.rb' then pp(kl.characters)
when 'pretty' then puts JSON.pretty_generate(kl.characters)
else puts JSON.dump(kl.characters)
end

