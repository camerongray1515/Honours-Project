-- The following arrays are provided which contain data collected by the plugin
-- values: Array of "values" returned by the plugin
-- messages: Array of "messages" returned by the plugin
-- result_types: Array with "plugin" for a successful check or the following error values:
--    "command_unsuccessful", "authentication_error", "request_error", "connection_error", "connection_timeout"
if arrayContains(values, "none") then
	return "unknown"
end

if arrayMax(values) > 0 then
	return "critical"
end

return "ok"
