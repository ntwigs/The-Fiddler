defmodule TakeItForASpin.State do
  @speed 2

  def start_link do
    Agent.start_link(fn -> %{ speed: 0, x: 0, y: 0 } end, name: :state)
  end


  # Speed State

  def increase_speed do
    if (get_speed < 10) do
      Agent.get_and_update(:state, &calculate_speed_increase(&1))
    else
      10
    end
  end

  def decrease_speed do
    if (get_speed > 0.01) do
      Agent.get_and_update(:state, &calculate_speed_decrease(&1))
    else
      0
    end
  end

  defp calculate_speed_increase map do
    speed = map.speed + @speed
    { speed, %{ map | speed: speed } }
  end

  defp calculate_speed_decrease map do
    speed = map.speed - 0.1
    { speed, %{ map | speed: speed } }
  end

  def get_speed do
    Agent.get(:state, &(&1.speed))
  end


  # Position State

  def set_position position do
    x = position["x"]
    y = position["y"]
    Agent.get_and_update(:state, &calculate_position(&1, x, y))
  end

  def calculate_position(previous_state, x, y) do
    new_value = %{ previous_state | x: x, y: y }
    { new_value, new_value }
  end

  def get_position do
    Agent.get(:state, &(&1))
  end

end