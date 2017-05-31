class AddAttachmentPictureToBenches < ActiveRecord::Migration
  def self.up
    change_table :benches do |t|
      t.attachment :picture
    end
  end

  def self.down
    remove_attachment :benches, :picture
  end
end
