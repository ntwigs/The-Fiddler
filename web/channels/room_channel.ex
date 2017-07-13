defmodule TakeItForASpin.RoomChannel do
  use Phoenix.Channel

  def join("room:fidget", _message, socket) do
    TakeItForASpin.State.start_link
    { :ok, socket }
  end

  def join("room:*", _message, _socket) do
    {:error, %{ reason: "There's only one fidget room!" }}
  end

  def handle_in("spin", _body, socket) do
    TakeItForASpin.State.increase_speed
    broadcast! socket, "spin", %{ body: 10 }
    { :noreply, socket }
  end

  def handle_in("initialize", _body, socket) do
    current_speed = TakeItForASpin.State.get_speed
    broadcast! socket, "initialize", %{ body: current_speed }
    { :noreply, socket }
  end
end