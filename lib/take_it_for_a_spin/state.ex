defmodule TakeItForASpin.State do
  @speed 1

  def start_link do
    Agent.start_link(fn -> %{ speed: 0 } end, name: :state)
  end

  def increase_speed do
    Agent.get_and_update(:state, &calculate_speed(&1))
  end

  defp calculate_speed(body) do
    speed = body.speed + @speed
    { speed, %{ speed: speed } }
  end

  def get_speed do
    Agent.get(:state, &(&1.speed))
  end
end