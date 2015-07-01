class CreateDrivers < ActiveRecord::Migration
  def change
    create_table :drivers do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
