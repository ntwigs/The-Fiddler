defmodule TakeItForASpin.State do
  @speed 1

  def start_link do
    Agent.start_link(fn -> %{ speed: 0 } end, name: :state)
  end

  def increase_speed do
    Agent.get_and_update(:state, &calculate_speed_increase(&1))
  end

  def decrease_speed do
    if (get_speed > 1.01) do
      Agent.get_and_update(:state, &calculate_speed_decrease(&1))
    else
      1
    end
  end

  defp calculate_speed_increase(body) do
    speed = body.speed + @speed
    { speed, %{ speed: speed } }
  end

  defp calculate_speed_decrease(body) do
    speed = body.speed - 0.1
    { speed, %{ speed: speed } }
  end

  def get_speed do
    Agent.get(:state, &(&1.speed))
  end
end