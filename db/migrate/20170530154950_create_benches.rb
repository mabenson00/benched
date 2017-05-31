class CreateBenches < ActiveRecord::Migration[5.0]
  def change
    create_table :benches do |t|
    	t.float :latitude
    	t.float :longitude
    	t.float :image_direction
    	t.integer :rating
    	t.string :address
      t.timestamps
    end
  end
end
