const protobuf = require("protobufjs");
const grpc = require("@grpc/grpc-js");

protobuf.load("../../protos/teststatemanagerpb.proto", function (err, root) {
	if (err) throw err;

	// Obtain a message type
	const StartTestRequest = root.lookupType("teststatemanager.StartTestRequest");
	const StartTestResponse = root.lookupType("teststatemanager.StartTestResponse");

	// Exemplary payload
	var payload = { userId: 573, testId: 17 };

	// Verify the payload if necessary (i.e. when possibly incomplete or invalid)
	var errMsg = StartTestRequest.verify(payload);
	if (errMsg) throw Error(errMsg);
	// Create a new message
	var message = StartTestRequest.create(payload); // or use .fromObject if conversion is necessary

	// Encode a message to an Uint8Array (browser) or Buffer (node)
	var buffer = StartTestRequest.encode(message).finish();
	// ... do something with buffer

	// Decode an Uint8Array (browser) or Buffer (node) to a message
	var message = StartTestRequest.decode(buffer);
	// ... do something with message

	// If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

	// Maybe convert the message back to a plain object
	var object = StartTestRequest.toObject(message, {
		longs: String,
		enums: String,
		bytes: String,
		// see ConversionOptions
	});

	const Client = grpc.makeGenericClientConstructor({});
	const client = new Client("http://localhost:8080", grpc.credentials.createInsecure());
	console.log(client);

	const rpcImpl = function (method, requestData, callback) {
		client.makeUnaryRequest(
			method.name,
			(arg) => arg,
			(arg) => arg,
			requestData,
			callback
		);
	};

	const TestStateManagement = root.lookup("TestStateManagement");
	const testStateManagement = TestStateManagement.create(rpcImpl, false, false);

	testStateManagement.startTest({ testId: 10, userId: 5 }, function (err, response) {
		console.log("Testing:", response);
	});
});
