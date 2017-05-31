class Bench < ApplicationRecord
	has_attached_file :picture, styles: { large: "960x640>", medium: "320x240>", thumb: "160x120?" }
  validates_attachment_content_type :picture, content_type: /\Aimage\/.*\z/
end
