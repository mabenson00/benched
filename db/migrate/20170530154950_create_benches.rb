class CreateBenches < ActiveRecord::Migration[5.0]
  def change
    create_table :benches do |t|
    	t.float :latitude
    	t.float :longitude
    	t.integer :rating
      t.timestamps
    end
  end
end
