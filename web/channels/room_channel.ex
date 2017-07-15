defmodule TakeItForASpin.RoomChannel do
  use Phoenix.Channel

  @spin "spin"
  @initialize "initialize"
  @update "update"

  def join("room:fidget", _message, socket) do
    { :ok, socket }
  end

  def join("room:*", _message, _socket) do
    { :error, %{ reason: "There's only one fidget room!" } }
  end

  def handle_in(@spin, _body, socket) do
    new_speed = TakeItForASpin.State.increase_speed
    broadcast! socket, @spin, %{ body: new_speed }
    { :noreply, socket }
  end

  def handle_in(@initialize, _body, socket) do
    current_speed = TakeItForASpin.State.get_speed
    broadcast! socket, @initialize, %{ body: current_speed }
    { :noreply, socket }
  end

  def handle_in(@update, _body, socket) do
    speed = TakeItForASpin.State.get_speed
    broadcast! socket, @update, %{ body: speed }
    { :noreply, socket }
  end
end