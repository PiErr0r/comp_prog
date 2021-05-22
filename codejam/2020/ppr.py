def overlaps(ts1, ts2):
	if ts1[0] >= ts2[0] and ts1[0] < ts2[1]:
		return True
	if ts2[0] >= ts1[0] and ts2[0] < ts1[1]:
		return True
	return False

T = int(input())

for test in range(T):
		N = int(input())
		schedule = ''
		sch_test = [' '] * N
		first = True
		activities = []
		sch = dict(C=None, J=None)
		for activity in range(N):
				length = list(map(int, input().split()))
				activities.append(length)
		activities_cp = activities[:]
		activities.sort(key=lambda act: act[0])
		for act in activities:
			i = activities_cp.index(act)
			activities_cp[i] = None
			if first:
				sch['C'] = act[:]
				first = False
				sch_test[i] = 'C'
				continue
			if overlaps(act, sch['C']):
				if sch['J'] is None:
					sch_test[i] = 'J'
					sch['J'] = act[:]
				elif overlaps(act, sch['J']):
					sch_test = list('IMPOSSIBLE')
					break
				else:
					sch_test[i] = 'J'
					sch['J'] = act[:]
			else:
				sch_test[i] = 'C'
				sch['C'] = act[:]

		schedule = ''.join(sch_test)
		print('Case #{0}: {1}'.format(test + 1, schedule))
