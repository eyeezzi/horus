#!/bin/bash

# Requires a container with Bash and Curl installed.

is_healthy () {
	retryInterval=${2:-5}
	maxAttempts=${3:-1000000}

	i=0
	while [ $i -lt $maxAttempts ]
	do
		status=$(curl -s -L -o /dev/null -w %{http_code} $1)

		# stop trying if we get a success response
		if [ $status -ge 200 ] && [ $status -lt 300 ]
		then
			return 0
		fi
		
		((i++))
		echo "Attempt $i of $maxAttempts: Endpoint $1 returned code $status. Retrying in $retryInterval seconds."
		sleep $retryInterval
	done

	return 1
}

# args: endpoint, retryInterval (secs), maxAttempts, command
if is_healthy $1 $2 $3
then
	echo "Running command: $4"
	# vulnerable to input-injection attacts (but I don't care :)
	eval "$4"
else
	echo "Exiting: Cannot run command because health-check failed."
fi